import { useState, type ReactNode } from "react";
import { TabContainer, TabContent, TabHeader, TabList } from "./style";

export type TabItem = {
  label: string;
  content: ReactNode;
  key: string;
};

type TabProps = {
  items: TabItem[];
};

export const Tab = ({ items }: TabProps) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <TabContainer>
      <TabList role="tablist">
        {items.map((item, index) => (
          <TabHeader
            key={item.key}
            role="tab"
            tabIndex={0}
            id={`tab-${item.key}`}
            aria-controls={`content-${item.key}`}
            aria-selected={currentTab === index}
            onClick={() => setCurrentTab(index)}
          >
            {item.label}
          </TabHeader>
        ))}
      </TabList>
      <TabContent
        role="tabpanel"
        aria-labelledby={`tab-${items[currentTab].key}`}
      >
        {items[currentTab].content}
      </TabContent>
    </TabContainer>
  );
};
