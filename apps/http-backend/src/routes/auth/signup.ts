import { Router } from "express";
import { signupSchema } from "@repo/common/zod";

const router: Router = Router();

router.post('/', async (req, res) => {
    try {

        const parsedData = signupSchema.safeParse(req.body);

        if(!parsedData.success) {
            res.status(404).json({
                message: "Incorrect inputs"
            });
            return;
        }

        const { name, username, email, password, gamertag } = parsedData.data;

        res.status(200).json({
            message: "Signed-up successfully!"
        });
        return;
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        });
        return;
    }
})

export default router;