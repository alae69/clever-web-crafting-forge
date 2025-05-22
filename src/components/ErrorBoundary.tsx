
import React, { Component, ErrorInfo, ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    console.error("ErrorBoundary caught an error:", error);
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error details:", error);
    console.error("Component stack:", errorInfo.componentStack);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 text-center min-h-[50vh] flex flex-col items-center justify-center">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-morocco-navy mb-3">We're having trouble loading this content</h2>
            <p className="text-gray-600 mb-6">
              {this.state.error 
                ? `There was a problem with this page: ${this.state.error.message}` 
                : "Please try refreshing the page to fix this issue"}
            </p>
            <Button 
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
