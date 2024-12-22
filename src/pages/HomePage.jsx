const HomePage = () => {
  return (
    <section className="w-full bg-white min-h-screen flex items-center">
      <div className="w-screen bg-gold-700 text-white py-12 px-6 text-center sm:px-12 lg:px-24">
        <h1 className="text-4xl sm:text-6xl font-bold">
          Welcome to Talent Hive
        </h1>

        <p className="text-xl mt-4">Explore services and spaces!</p>
        <p className="text-xl mt-4">
          Sign up, Go to Services and click on any services to see the review
          system{" "}
        </p>
      </div>
      <img
        src="/Collab-cuate (1).svg"
        alt="Collaboration Illustration"
        className="mx-auto w-1/2 h-auto my-8"
      />
    </section>
  );
};

export default HomePage;
