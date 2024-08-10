import { useAppContext } from '@src/AppContext';
import {
  PmFeedbackIcon,
  CustomerCallIcon,
  GeneralIcon,
  HealthNotesIcon,
  LostHoldReasonIcon,
  SupportCaseTicketIcon,
  SurveyIcon,
  RequestBusinessnameIcon,
} from './x-symbol-svgrepo-com';

const BusinessCategoryIcon = ({ businessName }: { businessName: string }) => {
  const icons = [
    'bagel_lost_hold_reason',
    'bagel_Support_Case_Ticket',
    'bagel_Customer_Call',
    'bagel_survey',
    'bagel_Health_Notes',
    'bagel_pm_feedback',
    'bagel_request',
    'bagel_opportunity',
  ];

  const { appState } = useAppContext();
  let category = null;
  if (businessName && appState.businessCategoryMapping && appState.businessCategoryMapping.length > 0) {
    category = appState.businessCategoryMapping.find((b: any) => b.businessName === businessName) || null;
  }
  return (
    <>
      {category && icons.includes(category?.icon) ? (
        <>
          {category?.icon === 'bagel_lost_hold_reason' && <LostHoldReasonIcon />}
          {category?.icon === 'bagel_Support_Case_Ticket' && <SupportCaseTicketIcon />}
          {category?.icon === 'bagel_Customer_Call' && <CustomerCallIcon />}
          {category?.icon === 'bagel_survey' && <SurveyIcon />}
          {category?.icon === 'bagel_Health_Notes' && <HealthNotesIcon />}
          {category?.icon === 'bagel_pm_feedback' && <PmFeedbackIcon />}
          {category?.icon === 'bagel_request' && <RequestBusinessnameIcon />}
          {category?.icon === 'bagel_opportunity' && <RequestBusinessnameIcon />}
          {category?.icon === 'bagel_general' && <GeneralIcon />}
        </>
      ) : (
        <GeneralIcon />
      )}
    </>
  );
};

export default BusinessCategoryIcon;
