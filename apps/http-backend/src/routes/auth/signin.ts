import { Router } from "express";
import { signinSchema } from "@repo/common/zod";

const router: Router = Router();

router.post('/', async (req, res) => {
    try {

        const parsedData = signinSchema.safeParse(req.body);

        if(!parsedData.success) {
            res.status(404).json({
                message: "Incorrect inputs"
            });
            return;
        }

        const { email, password } = parsedData.data;

        //db call
        
        res.status(200).json({
            message: "Signed-in successfully!"
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