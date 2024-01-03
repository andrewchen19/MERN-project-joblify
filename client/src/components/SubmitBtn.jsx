import { useNavigation } from "react-router-dom/dist";

const SubmitBtn = ({ text, size }) => {
  const navigation = useNavigation();
  //  console.log(navigation);
  const isSubmit = navigation.state === "submitting";

  return (
    <button
      type="submit"
      className={`btn btn-primary btn-block capitalize tracking-wide ${
        size || "btn-sm lg:btn-md"
      }`}
      disabled={isSubmit}
    >
      {isSubmit ? (
        <>
          <span className="loading loading-spinner"></span>
          sending...
        </>
      ) : (
        // 後面的 "submit" just in case , 當 props 忘記傳入時可以使用
        text || "submit"
      )}
    </button>
  );
};

export default SubmitBtn;
