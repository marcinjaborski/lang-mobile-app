import { LoginStack } from "@src/features/login";
import { BottomTabs } from "@src/features/navigation";
import { useUserRepository } from "@src/hooks";

export const Layout = () => {
  const { currentUser } = useUserRepository();

  if (currentUser === null) return <LoginStack />;

  return <BottomTabs />;
};
