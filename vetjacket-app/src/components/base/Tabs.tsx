import { classNames } from '@src/helpers/helper';
import { ChangeEvent } from 'react';

import { useNavigate } from 'react-router-dom';

export interface TabType {
  id: string | number;
  index: string | number;
  name: string;
  href?: string;
  count?: string | number;
  disabled: boolean;
}

export interface TabProps {
  tabs: TabType[];
  currentTab: TabType | null;
  setCurrentTab: (tab: TabType) => void;
}

export default function Tabs({ tabs, currentTab, setCurrentTab }: TabProps) {
  if (!currentTab) return null;
  const navigate = useNavigate();

  if (currentTab == null && tabs.length > 0) {
    setCurrentTab(tabs[0]);
  }

  const onTabChange = (tab: TabType) => {
    setCurrentTab(tab);
    if (tab.href) {
      navigate(tab.href);
    }
  };

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            setCurrentTab(
              tabs.find(
                (tab: TabType) => tab.name == event.target.value,
              ) as TabType,
            )
          }
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          defaultValue={currentTab.name}
        >
          {tabs.map((tab) => (
            <option value={tab.name} key={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                onClick={() => !tab.disabled && onTabChange(tab)}
                key={tab.index}
                href="#"
                className={classNames(
                  tab.index == currentTab.index
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                  'flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
                  tab.disabled ? 'opacity-50 cursor-not-allowed' : '',
                )}
                title={tab.disabled ? 'Soon' : ''}
                aria-current={
                  tab.index == currentTab.index ? 'page' : undefined
                }
              >
                {tab.name}

                {tab.count ? (
                  <span
                    className={classNames(
                      tab.index == currentTab.index
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-900',
                      'ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block',
                    )}
                  >
                    {tab.count}
                  </span>
                ) : null}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
