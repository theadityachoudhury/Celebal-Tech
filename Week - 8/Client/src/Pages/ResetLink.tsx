import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../Axios";
import Loader from "../Components/Loader";

const ResetLink = () => {
  const { id } = useParams();
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const isActiveLink = async () => {
    try {
      const { data } = await instance.get(`/api/auth/reset/${id}`);
      if (data.status === 200) {
        setIsActive(true);

      } else {
        setIsActive(false);
      }
    } catch (error) {
      //checking if error is an axios error or not
      setIsActive(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    isActiveLink();
    setLoading(false);
  }, [id]);

  if (loading) {
    return <Loader size={48} fullScreen />;
  }

  if (!isActive) {
    return <div className="text-center relative w-full h-screen">
      <div className="space-y-5 text-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-4xl font-bold text-center">Link Expired</h1>
        {/* Go home button */}
        <button
          onClick={() => {
            window.location.href = "/reset";
          }}
          className="text-lg text-white hover:bg-white hover:text-black duration-150 ease-linear font-bold py-2 px-4 border border-white">Get new link</button>
      </div>
    </div>;
  }

  if (!loading && isActive)
    return <div>{id}</div>;
};

export default ResetLink;
