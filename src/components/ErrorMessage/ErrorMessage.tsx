import css from "./ErrorMessage.module.css";
interface ErrorMessageType {
  error: string;
}
const ErrorMessage = ({ error }: ErrorMessageType) => {
  return (
    <div>
      <p className={css.text}>{error}.😕 Please try again...</p>
    </div>
  );
};

export default ErrorMessage;
