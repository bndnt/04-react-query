import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
interface SearchBarProps {
  onSubmit: (query: string) => Promise<void>;
}
const SearchBar = ({ onSubmit }: SearchBarProps) => {
  //   const [notification, setNotification] = useState<Boolean>(false);
  const handleSubmit = (formData: FormData) => {
    const query = formData.get("query") as string;
    // console.log(query);
    if (query.trim() === "") {
      toast.error("Type at least 1 symbol."); // ✅ вызываем здесь, а не в рендере
      return;
    }

    onSubmit(query);
  };
  //   const notify = () => toast.remove();
  //   toast.error("Type at least 1 symbol.");

  return (
    <header className={css.header}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form action={handleSubmit} className={css.form}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
