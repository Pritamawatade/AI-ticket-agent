import nodemailer from "nodemailer";

export const sendMail = async (to: string, subject: string, text: string) => {
    try {
        let transporter: nodemailer.Transporter;

        const hasMailtrapEnv =
            !!process.env.MAILTRAP_SMTP_HOST &&
            !!process.env.MAILTRAP_SMTP_PORT &&
            !!process.env.MAILTRAP_SMTP_USER &&
            !!process.env.MAILTRAP_SMTP_PASS;

        if (hasMailtrapEnv) {
            transporter = nodemailer.createTransport({
                host: process.env.MAILTRAP_SMTP_HOST,
                port: Number(process.env.MAILTRAP_SMTP_PORT),
                secure: false,
                auth: {
                    user: process.env.MAILTRAP_SMTP_USER,
                    pass: process.env.MAILTRAP_SMTP_PASS,
                },
            });
        } else if (process.env.NODE_ENV !== "production") {
            // Fallback to Ethereal in development for easy testing
            const testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });
        } else {
            // In production and no SMTP config: log and exit gracefully
            console.warn(
                "Email disabled: MAILTRAP_* envs missing in production. Skipping sendMail."
            );
            return { skipped: true } as any;
        }

        const info = await transporter.sendMail({
            from: "Inngest TMS <no-reply@inngest-tms.local>",
            to,
            subject,
            text,
        });

        // If using Ethereal, log preview URL for convenience
        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
            console.log("Preview URL:", previewUrl);
        }

        console.log("Message sent:", info.messageId);
        return info;
    } catch (error: any) {
        console.error("❌ Mail error", error?.message || error);
        throw error;
    }
};
