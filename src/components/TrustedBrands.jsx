import Marquee from "react-fast-marquee";

const brands = [
  "https://avatars.mds.yandex.net/i?id=774a6ea64199c28baf651fb8db16dbdf76642710-4841286-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=a886c4cb452756649805eb2d6001a211acfabc87-5234060-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=f7e0c8069bb2458ea29a5238c2f810f602456e76-12528722-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=be0324cb898099a748bc134227bfbd4041d5fa4b-10640295-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=03e8b687c726bb77e3d739bec2bb287df276ebe6-8285735-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=4fa4e6b8d6fa693c9734e8e6bc80fdf207639556-4590839-images-thumbs&n=13",
];

const TrustedBrands = () => {
  return (
    <section className="py-8">
        {/* Brand Logos */}
        <div className="overflow-hidden">
        <h2 className="text-3xl font-bold mb-4 text-center">
            Trusted by Leading Brands
          </h2>
          <div className="flex items-center justify-around animate-scroll">
            <Marquee gradient={false} speed={50}  pauseOnHover={true}>
            {[...brands, ...brands].map((logo, idx) => (
              <img
                key={idx}
                src={logo}
                alt="brand"
                className="h-12 mx-6  transition"
              />
            ))}
            </Marquee>
          </div>
        </div>
    </section>
  );
};

export default TrustedBrands;
