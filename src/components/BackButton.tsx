import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { SxProps, Theme } from '@mui/material/styles';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  sx?: SxProps<Theme>;
}

const BackButton = ({ onClick, label = 'Back to list', sx }: BackButtonProps) => {
  return (
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={onClick}
      variant="outlined"
      color="primary"
      sx={{
        textTransform: 'none',
        borderRadius: '999px',
        borderWidth: 1.5,
        px: 3,
        py: 1.25,
        fontWeight: 600,
        boxShadow: '0 12px 24px rgba(30, 136, 229, 0.12)',
        transition: 'transform 150ms ease, box-shadow 150ms ease',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 18px 28px rgba(30, 136, 229, 0.16)'
        },
        ...((sx || {}) as object)
      }}
    >
      {label}
    </Button>
  );
};

export default BackButton;
