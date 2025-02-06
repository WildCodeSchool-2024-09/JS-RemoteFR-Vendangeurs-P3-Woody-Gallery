import HomeAllCollections from "../components/Homepage/HomeAllCollections";
import HomeLastCollection from "../components/Homepage/HomeLastCollection";
import HomeOurSelection from "../components/Homepage/HomeOurSelection";
import HomeReviews from "../components/Homepage/HomeReviews";

export default function Homepage() {
  return (
    <>
      <HomeLastCollection />
      <HomeOurSelection />
      <HomeReviews />
      <HomeAllCollections />
    </>
  );
}
