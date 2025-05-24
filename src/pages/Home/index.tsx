import { HomeHeader } from "../../components/HomeHeader";
import { Tab, type TabItem } from "../../components/Tab";
import { NewestContent } from "./NewestContent";
import { PopularContent } from "./PopularContent";

const TAB_ITEMS: TabItem[] = [
  {
    label: "Popular",
    content: <PopularContent />,
    key: "popular",
  },
  {
    label: "Newest",
    content: <NewestContent />,
    key: "newest",
  },
];

export const Home = () => {
  return (
    <main>
      <HomeHeader />

      <Tab items={TAB_ITEMS} />
    </main>
  );
};
