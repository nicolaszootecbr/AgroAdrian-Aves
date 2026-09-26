import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
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
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    localStorage.removeItem('checklist_avicola_answers');
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f5f3ec] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl p-6 border border-stone-300 shadow-xl text-center space-y-4">
            <div className="w-12 h-12 bg-red-100 text-red-700 rounded-full flex items-center justify-center mx-auto">
              <AlertOctagon className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-stone-900">
              Ocorreu uma instabilidade na aplicação
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Não se preocupe, seus dados locais foram preservados. Clique abaixo para reiniciar a interface do checklist com segurança.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => window.location.reload()}
                className="w-full py-2.5 bg-[#1b4d3e] text-white font-bold text-sm rounded-xl hover:bg-[#153e32] transition-colors"
              >
                Recarregar Aplicativo
              </button>
              <button
                onClick={this.handleReload}
                className="w-full py-2 text-stone-500 hover:text-red-700 text-xs font-semibold transition-colors"
              >
                Limpar cache e reiniciar do zero
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
