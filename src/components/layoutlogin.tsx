import loginBg from "../app/assets/loginbg.png";

export function Layout({children}: {children: React.ReactNode}) {
  return (
    <div
      className="bg-cover h-screen w-full"
      style={{backgroundImage: `url(${loginBg})`}}>
      {children}
    </div>
  );
}
