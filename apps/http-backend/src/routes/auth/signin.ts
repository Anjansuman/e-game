import { Router, Request, Response } from "express";
// @ts-ignore
import { signinSchema } from "@repo/common/zod";
import { client } from "@repo/database/client"

const router: Router = Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {

        const parsedData = signinSchema.safeParse(req.body);

        if(!parsedData.success) {
            res.status(404).json({
                message: "Incorrect inputs"
            });
            return;
        }

        const { email, password } = parsedData.data;

        const user = await client.user.findUnique({
            where: {
                email,
                password
            }
        })
        
        res.status(200).json({
            message: "Signed-in successfully!",
            user
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