import React, { useEffect } from "react";
import { getUserByUsername } from "../../features/user/userApi";
import UserProfile from "./UserProfile";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import ListProfile from "./ListProfile";
import styles from "./VisitProfile.module.css";

const VisitProfile = () => {
  const [user, setUser] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const { username } = useParams<{ username: string }>();
  const userLogged = useAppSelector((state) => state.user.user);

  const navigate = useNavigate();

  const getProfileUser = async (username: string) => {
    let response;
    try {
      setError(null);
      setLoading(true);
      response = await getUserByUsername(username);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setUser(response);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userLogged?.username === username) {
      navigate("/account");
    }

    if (!username) setError("Usuário não encontrado!");
    else getProfileUser(username);
  }, [username, navigate, userLogged?.username]);

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;
  if (user)
    return (
      <div className={styles["visit-profile"]}>
        <UserProfile user={user} />
        <ListProfile user={user} />
      </div>
    );
  else return null;
};

export default VisitProfile;
