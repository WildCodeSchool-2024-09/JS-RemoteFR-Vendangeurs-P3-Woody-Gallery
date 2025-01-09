import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeCollections from "../components/HomeCollections";
import HomeLastCollection from "../components/HomeLastCollection";
import HomeOurSelection from "../components/HomeOurSelection";
import HomeReviews from "../components/HomeReviews";

export default function Homepage() {
  return (
    <>
      <Header />
      <HomeLastCollection />
      <HomeOurSelection />
      <HomeReviews />
      <HomeCollections />
      <Footer />
    </>
  );
}
