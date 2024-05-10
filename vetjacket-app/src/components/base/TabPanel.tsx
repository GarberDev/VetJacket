import { TabType } from "./Tabs";

interface TabPanelProps {
  children?: React.ReactNode;
  index: string | number;
  currentTab: TabType;
}

export default function TabPanel(props: TabPanelProps) {
  const { children, index, currentTab, ...other } = props;

  return (
    <div
      role="tabpanel"
      className={currentTab.id == index ? "flex flex-grow w-full" : ""}
      hidden={currentTab.id !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {index === currentTab.id && <div className="w-full">{children}</div>}
    </div>
  );
}
