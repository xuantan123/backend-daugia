import ProfileUser from "../../models/user/ProfileUser";


export const handleProfileUser = async(req,res) => { 
    try {
        const { fullname, gender, country , walletaddress } = req.body;
        const newUser = await ProfileUser.create({
            fullname,
            gender,
            country,
            walletaddress,
        });

        res.status(201).json({
            message: 'Profile user created successfully',
            user: newUser
        });
    } catch (error) {
        console.error('Error during update profile:', error);
        res.status(500).json({
            message: 'Update profile user failed',
            error: error.message
        });
    }
}
export const handleEditProfileUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname, gender, country, walletaddress } = req.body;

        const user = await ProfileUser.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const updatedUser = await user.update({
            fullname,
            gender,
            country,
            walletaddress,
        });

        res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error('Error during profile update:', error);
        res.status(500).json({
            message: 'Profile update failed',
            error: error.message,
        });
    }
};