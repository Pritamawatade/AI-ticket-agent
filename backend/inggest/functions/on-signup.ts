import { NonRetriableError } from "inngest";
import User ,{type User as UserModel} from "../../models/user";
import { inngest } from "../client";
import { sendMail } from "../../libs/mailer";

export const onUserSignup = inngest.createFunction(
  { id: "on-user-signup", retries: 2 },
  { event: "user/signup" }, // event is like  a name of the functions
  async ({ event, step }) => {
    try {
      const { email } = event.data;
      const user: any = await step.run("get-user-email", async () => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new NonRetriableError("User not found");
        }

        return user;
      });

      await step.run("send-welcome-email", async () => {
        await sendMail(
          user.email,
          "Welcome to the system",
          "Welcome to the system"
        );
      });

      return {success:true}
    } catch (error) {
        console.error(`❌ Error in onUserSignup function`, error);
        return {success:false}
    }
  }
);
