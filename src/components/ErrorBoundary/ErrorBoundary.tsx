import { Box, Link, Typography } from '@mui/material';
import { Component, ErrorInfo, PropsWithChildren } from 'react';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<PropsWithChildren, State> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  async componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const logger = (await import('config/logger/logger')).default;
    logger.error({ message: error.message, errorInfo });
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (!hasError) {
      return children;
    }

    return (
      <Box textAlign="center" mt="20%">
        <Typography variant="h3" mb={2}>
          Щось пішло не так 🥲
        </Typography>
        <Typography variant="h5">
          Ми вже працюємо над проблемою. <Link href="/">Перезавантажте</Link>{' '}
          будь-ласка сторінку і зіграйте ще раз.
        </Typography>
      </Box>
    );
  }
}
