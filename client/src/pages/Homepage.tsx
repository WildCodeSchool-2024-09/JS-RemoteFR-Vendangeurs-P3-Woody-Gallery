import HomeCollections from "../components/HomeCollections";
import HomeLastCollection from "../components/HomeLastCollection";
import HomeOurSelection from "../components/HomeOurSelection";
import HomeReviews from "../components/HomeReviews";

export default function Homepage() {
  return (
    <>
      <HomeLastCollection />
      <HomeOurSelection />
      <HomeReviews />
      <HomeCollections />
    </>
  );
}
