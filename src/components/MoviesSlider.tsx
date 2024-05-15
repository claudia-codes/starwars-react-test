import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { MobileStepper, Typography, Button, Divider, Box } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { getCountOfPlanetsNoWater } from "../utils/planets";

const TextMobileStepper = ({ steps }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Box sx={{ minHeight: 100 }}>
        <Typography sx={{ pb: 2 }} variant="h6">
          {steps[activeStep].title}
        </Typography>
        <Box sx={{ pb: 1 }}>{steps[activeStep].releaseDate}</Box>
        <Box sx={{ pb: 1 }}>
          Number of planets without water:{" "}
          {getCountOfPlanetsNoWater(
            steps[activeStep].planetConnection?.planets
          )}
        </Box>
      </Box>
      <Divider />
      <MobileStepper
        sx={{ pt: 2 }}
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default TextMobileStepper;
