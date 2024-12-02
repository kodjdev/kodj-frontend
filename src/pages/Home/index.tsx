// import { Link } from "react-router-dom";
// import { Button } from "../../components/ui/button";

// export default function Home() {
//   return (
//     <div>
//       <div style={{ padding: "10px" }}>
//         <div>This is my home page </div>
//         <Button>
//           <Link to="/login">Login</Link>
//         </Button>
//         <div>{} hook data</div>
//       </div>
//     </div>
//   );
// }

import { FeaturesSection } from "../../components/ui/bento-grid";
import { CardHoverEffect } from "../../components/HoverCards";

export default function Home() {

  return (
    <div>
      <FeaturesSection/>
      <CardHoverEffect/>
    </div>
  );
}
