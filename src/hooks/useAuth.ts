import { useAppSelector } from '../store/hooks';

export const useAuth = () => {
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);
  const isAuth = Boolean(user);

  return { isAuth, user, loading };
};
