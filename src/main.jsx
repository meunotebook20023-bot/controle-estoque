import React from &quot;react&quot;;
import ReactDOM from &quot;react-dom/client&quot;;
import { BrowserRouter } from &quot;react-router-dom&quot;;
import &quot;./styles/index.css&quot;;
import App from &quot;./App&quot;;

const root = ReactDOM.createRoot(document.getElementById(&quot;root&quot;));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
