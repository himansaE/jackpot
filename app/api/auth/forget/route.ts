type ReqBody = {
  email: string;
};

const local_validate = ({ email }: ReqBody) => {
  // validate email
  if (
    !(
      typeof email === "string" &&
      /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
    )
  )
    return "Enter valid Email address.";
  return true;
};

export async function POST(req: Request, res: Response) {}
