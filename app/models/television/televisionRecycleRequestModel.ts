import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import User from '@/models/User';
import TelevisionRecycle from '@/models/television/televisionRecycleSubmission'; // Make sure path is correct

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
      const session = await getSession({ req });

      if (!session?.user?.email) {
            return res.status(401).json({ message: 'Unauthorized' });
      }

      const user = await User.findOne({ email: session.user.email });

      if (!user) {
            return res.status(404).json({ message: 'User not found' });
      }

      // ✅ Extract data from the request body
      const {
            brand,
            model,
            recycleItemPrice,
            pickupDate,
            pickupTime,
            phone,
            address,
            selectedFacility,
      } = req.body;

      // ✅ Calculate points
      const earnedPoints = Math.floor(recycleItemPrice * 0.15);

      // ✅ Create new recycle request with all required fields
      const recycleRequest = new TelevisionRecycle({
            brand,
            model,
            recycleItemPrice,
            pickupDate,
            pickupTime,
            phone,
            address,
            selectedFacility,
            userId: user._id,
      });

      await recycleRequest.save();

      // ✅ Update user points
      user.points += earnedPoints;
      await user.save();

      // ✅ Respond success
      res.status(200).json({
            message: 'Recycle request saved',
            earnedPoints,
      });
}


