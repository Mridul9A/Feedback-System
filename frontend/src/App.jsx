import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FeedbackForm from './components/FeedbackForm';
import FeedbackDashboard from './components/FeedbackDashboard';
import './styles/feedback.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="feedback-container">
        <section className="submit-feedback">
          <FeedbackForm />
        </section>
        <section className="feedback-dashboard">
          <FeedbackDashboard />
        </section>
      </div>
    </QueryClientProvider>
  );
}

export default App;
