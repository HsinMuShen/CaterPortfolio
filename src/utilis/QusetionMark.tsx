import React, { useState } from "react";
import styled from "styled-components";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

const QusetionMarkWrapper = styled.div`
  position: fixed;
  top: 130px;
  right: 40px;
  font-size: 24px;
  cursor: pointer;
`;

interface State {
  run: boolean;
  steps: Step[];
}

const QusetionMark = () => {
  const [{ run, steps }, setState] = useState<State>({
    run: false,
    steps: [
      {
        content: <h2>歡迎來到Caterportfolio!</h2>,
        placement: "center",
        target: "body",
      },
      {
        content: <h2>Sticky elements</h2>,
        placement: "center",
        target: "body",
      },
      {
        content: "These are our super awesome projects!",
        target: "body",
        title: "Our projects",
      },
    ],
  });

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    setState({
      run: true,
      steps,
    });
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ run: false, steps });
    }
  };
  return (
    <QusetionMarkWrapper>
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        run={run}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        styles={{
          options: {
            zIndex: 11,
          },
        }}
      />
      <div onClick={handleClickStart}>
        <FontAwesomeIcon icon={faCircleQuestion} />
      </div>
    </QusetionMarkWrapper>
  );
};

export default QusetionMark;
