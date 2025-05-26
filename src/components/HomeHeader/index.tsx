import { Search } from "lucide-react";
import { MaxContentWidth } from "../MaxContentWidth";
import {
  DateHeader,
  HeaderContainer,
  HeaderWrapper,
  SearchButton,
  UserImage,
} from "./styles";

/**
 * @TODO Add search button functionality
 * @TODO Add user image functionality
 */
export const HomeHeader = () => {
  const dateHeader = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });

  return (
    <HeaderContainer>
      <MaxContentWidth>
        <HeaderWrapper>
          <UserImage
            src={
              "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />

          <DateHeader>Today, {dateHeader}</DateHeader>
          <SearchButton type="button">
            <Search />
          </SearchButton>
        </HeaderWrapper>
      </MaxContentWidth>
    </HeaderContainer>
  );
};
