import Input from "@mui/material/Input";
import { IoIosSearch } from "react-icons/io";

export default function Search() {
  return (
    <Input
      className="w-11/12 rounded-xl border-none bg-stone-50 px-2 py-2 before:hidden after:hidden"
      startAdornment={<IoIosSearch size="30px" className="ml-2 mr-2" />}
      placeholder="Search"
      autoComplete="onasdf"
      endAdornment={<IoIosSearch size="30px" className="ml-2 mr-2" />}
    />
  );
}
