import BottomGroupCss from "../src/styles/BottomGroup.module.css";
import Image from "next/image";

const bottomGroup = () => {
  return (
    <>
      {/* BOTTOM IMAGE SECTION */}

      <div className={BottomGroupCss.grouptalk}>
        <div>
          <div className={BottomGroupCss.groupParent}>
            <Image
              alt="Sky"
              className={BottomGroupCss.grouptalk}
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/images/footer.svg`}
              fill
            ></Image>
          </div>

          <div className={BottomGroupCss.newBtn}>
            <div md={8}>
              <h5 className={BottomGroupCss.grouptalkTitle}>
                The privacy factor, the wow factor…
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default bottomGroup;
