import GongIcon from './icons/GongIcon';
import IntercomIcon from './icons/IntercomIcon';
import JiraIcon from './icons/JiraIcon';
import SalesforceIcon from './icons/SalesforceIcon';
import SlackIcon from './icons/SlackIcon';
import ZendeskIcon from './icons/ZendeskIcon';
import AccountIcon from './icons/AccountIcon';
import DataIcon from './icons/DataIcon';
import IntegrationsIcon from './icons/IntegrationsIcon';
import MembersIcon from './icons/MembersIcon';
import TeamsIcon from './icons/TeamsIcon';
import MemberProfileIcon from './icons/MemberProfileIcon';
import NotionIcon from './icons/NotionIcon';
import ClickupIcon from './icons/ClickupIcon';
import FingerprintIcon from './icons/FingerprintIcon';
import IdeaLightBulb from './icons/IdeaLightBuld';
// import Solution from "../components/solutions/Solution";
import User from './icons/User';
import Opportunity from './icons/Opportunity';
import ActiveIcon from './icons/ActiveIcon';
import FilterIcon from './icons/FilterIcon';
import ListIcon from './icons/ListIcon';
import BackIcon from './icons/BackIcon';
import Bin from './icons/Bin';
import DropdownIcon from './icons/DropdownIcon';
import Sort from './icons/Sort';
import RedIcon from './icons/ColorIcons/RedIcon';
import PinkIcon from './icons/ColorIcons/PinkIcon';
import YellowIcon from './icons/ColorIcons/GreenIcon';
import GreenIcon from './icons/ColorIcons/YellowIcon';
import GrayIcon from './icons/ColorIcons/GrayIcon';
import BlueIcon from './icons/ColorIcons/BlueIcon';
import KebabMenu from './icons/KebabMenu';
import TickIcon from './icons/TickIcon';
import TickInCircle from './icons/TickInCircle';
import ProductAreaIcon from './icons/ProductAreaIcon';
import ArrowRight from './icons/ArrowRight';
import ArrowLeft from './icons/ArrowLeft';
import DisplayIcon from './icons/DisplayIcon';
import { GeneralIcon, GeneralPurpuleIcon, PendoIcon, VivunIcon } from '../components/icons/x-symbol-svgrepo-com';
import ProductBoardIcon from './icons/ProductBoardIcon';
import ChromeIcon from './icons/ChromeIcon';

export const SourceIcon = (props: { sourceName: string; width?: number; height?: number }) => {
  const icons: any = {
    zendesk: <ZendeskIcon height={props.height ? props.height : 20} width={props.width ? props.width : 20} />,
    intercom: <IntercomIcon height={props.height ? props.height : 25} width={props.width ? props.width : 25} />,
    gong: <GongIcon height={props.height ? props.height : 25} width={props.width ? props.width : 25} />,
    slack: <SlackIcon height={props.height ? props.height : 25} width={props.width ? props.width : 25} />,
    jira: <JiraIcon height={props.height ? props.height : 25} width={props.width ? props.width : 25} />,
    clickup: <ClickupIcon height={props.height ? props.height : 25} width={props.width ? props.width : 25} />,
    productboard: <ProductBoardIcon height={props.height ? props.height : 25} width={props.width ? props.width : 25} />,
    salesforce: <SalesforceIcon height={props.height ? props.height : 25} width={props.width ? props.width : 25} />,
    account: <AccountIcon height={props.height ? props.height : 25} width={props.width ? props.width : 25} />,
    data: <DataIcon height={props.height ? props.height : 25} width={props.width ? props.width : 25} />,
    integrations: <IntegrationsIcon height={props.height ? props.height : 25} width={props.width ? props.width : 25} />,
    members: <MembersIcon height={props.height ? props.height : 25} width={props.width ? props.width : 25} />,
    teams: <TeamsIcon height={props.height ? props.height : 25} width={props.width ? props.width : 25} />,
    'members-profile': (
      <MemberProfileIcon height={props.height ? props.height : 25} width={props.width ? props.width : 25} />
    ),
    notion: <NotionIcon height={props.height ? props.height : 25} width={props.width ? props.width : 25} />,
    bagel: <GeneralIcon />,
    fingerprint: <FingerprintIcon height={props.height ? props.height : 30} width={props.width ? props.width : 30} />,
    'idea-lightbulb': (
      <IdeaLightBulb height={props.height ? props.height : 30} width={props.width ? props.width : 30} />
    ),
    // 'solution': <Solution height={props.height ? props.height : 30} width={props.width ? props.width : 30}/>,
    user: <User height={props.height ? props.height : 30} width={props.width ? props.width : 30} />,
    opportunity: <Opportunity height={props.height ? props.height : 30} width={props.width ? props.width : 30} />,
    active: <ActiveIcon height={props.height ? props.height : 15} width={props.width ? props.width : 15} />,
    filter: <FilterIcon height={props.height ? props.height : 20} width={props.width ? props.width : 20} />,
    list: <ListIcon height={props.height ? props.height : 35} width={props.width ? props.width : 35} />,
    back: <BackIcon height={props.height ? props.height : 27} width={props.width ? props.width : 27} />,
    bin: <Bin height={props.height ? props.height : 15} width={props.width ? props.width : 15} />,
    dropdown: <DropdownIcon height={props.height ? props.height : 8} width={props.width ? props.width : 10} />,
    sort: <Sort height={props.height ? props.height : 15} width={props.width ? props.width : 15} />,
    red: <RedIcon height={props.height ? props.height : 20} width={props.width ? props.width : 20} />,
    pink: <PinkIcon height={props.height ? props.height : 20} width={props.width ? props.width : 20} />,
    yellow: <YellowIcon height={props.height ? props.height : 20} width={props.width ? props.width : 20} />,
    green: <GreenIcon height={props.height ? props.height : 20} width={props.width ? props.width : 20} />,
    gray: <GrayIcon height={props.height ? props.height : 20} width={props.width ? props.width : 20} />,
    blue: <BlueIcon height={props.height ? props.height : 20} width={props.width ? props.width : 20} />,
    'kebab-menu': <KebabMenu height={props.height ? props.height : 6} width={props.width ? props.width : 20} />,
    tick: <TickIcon height={props.height ? props.height : 12} width={props.width ? props.width : 15} />,
    'tick-circle': <TickInCircle height={props.height ? props.height : 20} width={props.width ? props.width : 20} />,
    'product-area': (
      <ProductAreaIcon height={props.height ? props.height : 25} width={props.width ? props.width : 25} />
    ),
    'arrow-right': <ArrowRight height={props.height ? props.height : 24} width={props.width ? props.width : 24} />,
    'arrow-left': <ArrowLeft height={props.height ? props.height : 24} width={props.width ? props.width : 24} />,
    display: <DisplayIcon height={props.height ? props.height : 30} width={props.width ? props.width : 30} />,
    hero: <VivunIcon />,
    pendo: <PendoIcon />,
    'n/a': <GeneralPurpuleIcon />,
    'chrome extension': <ChromeIcon height={props.height} width={props.width} />,
  };
  return props.sourceName ? <>{icons[props.sourceName.toLowerCase()] || <GeneralPurpuleIcon />}</> : <GeneralIcon />;
};
