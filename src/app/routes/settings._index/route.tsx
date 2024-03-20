import {LoaderFunction, TypedResponse, redirect} from "@remix-run/node";

export const loader: LoaderFunction = async (): Promise<
  TypedResponse<never>
> => {
  return redirect("/settings/general");
};
