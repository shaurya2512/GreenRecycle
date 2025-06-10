import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import User from '@/models/User';
import RefrigeratorRecycle from '@/models/others/othersRecycleSubmission'; // Make sure path is correct

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
      const session = await getSession({ req });

      if (!session?.user?.email) {
            return res.status(401).json({ message: 'Unauthorized' });
      }

      const user = await User.findOne({ email: session.user.email });

      if (!user) {
            return res.status(404).json({ message: 'User not found' });
      }


      const {
            deviceType,
            deviceCompanyOrModel,
            recycleItemPrice,
            pickupDate,
            pickupTime,
            phone,
            address,
            selectedFacility,
      } = req.body;


      const earnedPoints = Math.floor(recycleItemPrice * 0.15);


      const recycleRequest = new RefrigeratorRecycle({
            deviceType,
            deviceCompanyOrModel,
            recycleItemPrice,
            pickupDate,
            pickupTime,
            phone,
            address,
            selectedFacility,
            userId: user._id,
      });

      await recycleRequest.save();


      user.points += earnedPoints;
      await user.save();


      res.status(200).json({
            message: 'Recycle request saved',
            earnedPoints,
      });
}
