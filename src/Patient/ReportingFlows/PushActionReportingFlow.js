import { useEffect } from "react";
import useStores from "../../Basics/UseStores";
import { observer } from "mobx-react";
import { useMatomo } from "@datapunt/matomo-tracker-react";

const PushActionReportingFlow = observer(() => {
  const { trackEvent } = useMatomo();

  const { uiStore, patientStore, patientUIStore } = useStores();
  const search = uiStore.router.location.search;

  const noIssues = search.includes("noIssues=true");
  const hadIssues = search.includes("issues=true");

  useEffect(() => {
    let value = "";

    if (noIssues) {
      value = "no-issues";
      patientStore.submitOneStepReport();
      uiStore.push("/home");
    } else if (hadIssues) {
      value = "had-issues";
      patientStore.refreshReportDate();
      patientUIStore.moveToReportFlow();
    }
    trackEvent({
      category: "push-action-use",
      action: "click-event",
      value: value,
    });
  }, [search]);
});

export default PushActionReportingFlow;
