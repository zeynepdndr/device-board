const TemperatureGraph = () => {
  //   const [favoritesIsShown, setFavoritesIsShown] = useState(false);
  //   const [sensors, setSensors] = useState();
  //   const [error, setError] = useState(false);
  //   const [sensorsCount, setSensorCounts] = useState(null);
  //   const [isLoading, setIsLoading] = useState(false);

  //   const getSensors = () => {
  //     setIsLoading(true);
  //     fetch("http://localhost:3009/sensor")
  //       .then((res) => res.json())
  //       .then((json) => {
  //         console.log(json);
  //         setSensors(json.results);
  //         setIsLoading(false);
  //         setSensorCounts(json.paging.count);
  //       })
  //       .catch((err) => {
  //         setIsLoading(false);
  //         setError(true);
  //       });
  //   };

  //   useEffect(() => {
  //     getSensors();
  //     console.log("sensors", sensors);
  //     console.log("error:", error);
  //     console.log("load:", isLoading);
  //   }, []);
  //   useEffect(() => {}, [sensors]);

  return <>Graph</>;
};

export default TemperatureGraph;
