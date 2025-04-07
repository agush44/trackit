import { CustomKanban } from "./components/CustomKanban/CustomKanban";
import "./App.css";
import { TaskProvider } from "./context/taskProvider";

function App() {
  return (
    <TaskProvider>
      <div className="h-screen w-full">
        <CustomKanban></CustomKanban>
      </div>
    </TaskProvider>
  );
}

export default App;
