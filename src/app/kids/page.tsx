import { getQandA } from "../api/questions/route";
import { KidsSelection } from "./KidsSelection";

export default async function Page() {
  const { questions, answers } = await getQandA();
  return <KidsSelection questions={questions} answers={answers} />;
}
