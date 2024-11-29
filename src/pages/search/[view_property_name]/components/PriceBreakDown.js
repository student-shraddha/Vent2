import { useState, useEffect } from "react";
import React from "react";
import StaticPriceBreakDownCss from "./style/StaticPriceBreakDownCss.module.css";
import dayjs from "dayjs";
import ChargesCodeJson from "../../../json/charges code.json";

const StaticPriceBreakDown = (props) => {
  let CommisionPercentage = 9;
  const [CustomTotalAmount, setCustomTotalAmount] = useState(0);
  const [NightsCounter, setNightsCounter] = useState(0);

  useEffect(() => {
    const startDate = dayjs(props?.data?.arrivalDate); // Replace with your start date
    const endDate = dayjs(props?.data?.departureDate); // Replace with your end date
    setNightsCounter(endDate.diff(startDate, "days") || 0);

    return () => { };
  }, [props?.data?.arrivalDate, props?.data?.departureDate]);

  //* Function to render the name based on feeCode

  const FindPropertyFeeChargeByName = (feeCode) => {
    const object = ChargesCodeJson.propertyFees.find(
      (item) => item.feeCode === feeCode
    );
    return object ? object.name.en : "Fee not found";
  };

  const FindRequiredTaxesChargeByName = (taxCode) => {
    const object = ChargesCodeJson.propertyTaxes.find(
      (item) => item.taxCode === taxCode
    );
    return object ? object.name.en : "Fee not found";
  };

  const CommissionCalc = (TotalAmount) => {
    return (TotalAmount * CommisionPercentage) / 100;
  };

  const [SumAmountCharges, setSumAmountCharges] = useState(0); // Initial state for the total amount

  // Use the useEffect hook to calculate the SumAmountCharges when the FeeAndTexesRentalObject array changes
  useEffect(() => {
    if (props?.data?.property_type === "Rental") {
      //  Use map to extract the "amount" property from each object and create an array of amounts
      const amountsArray =
        props?.data?.RentalpaxPriceBreakDown?.TotalFeesTaxes.map((item) =>
          Math.round(Number(item.Amount))
        );

      //  Use reduce to calculate the sum of all amounts in the array

      const sum = amountsArray.reduce(
        (accumulator, currentAmount) => accumulator + currentAmount,
        0
      );

      // Update the state with the calculated total amount
      setSumAmountCharges(sum);
    }
  }, [props?.data]);

  return (
    <>
      {props?.data?.property_type === "Nextpax" ? (
        //* SECTION FOR NEXTPAX PRICE BREAKDOWN
        <div>
          <div
            className={StaticPriceBreakDownCss.total_price_charge_main_div}
          >
            <div className={StaticPriceBreakDownCss.total_price_text_div}>
              <h5
                className={StaticPriceBreakDownCss.total_price_charges_text}
              >
                $
                {`${props?.data?.StartingFromPrice
                  ? props?.data?.StartingFromPrice >= 0.5
                    ? Math.ceil(props?.data?.StartingFromPrice)
                    : Math.floor(props?.data?.StartingFromPrice)
                  : 0
                  }
                         x ${props?.data?.NightsCounter} night`}
              </h5>
            </div>
            <div className={StaticPriceBreakDownCss.total_price_text_div}>
              <p className={StaticPriceBreakDownCss.total_price}>
                $
                {props?.data?.StartingFromPrice * props?.data?.NightsCounter
                  ? Math.round(props?.data?.StartingFromPrice * props?.data?.NightsCounter)
                  : 0}
              </p>
            </div>
          </div>
          {props?.data?.NextpaxPriceBreakDown?.breakdown?.charges?.itemized.map(
            (Data, Index) => {
              return (
                <>
                  {props?.data?.NextpaxPriceBreakDown?.breakdown?.charges ===
                    {} ? (
                    ""
                  ) : (
                    <div
                      key={Index}
                      className={
                        StaticPriceBreakDownCss.total_price_charge_main_div
                      }
                    >
                      <div
                        className={StaticPriceBreakDownCss.total_price_text_div}
                      >
                        <h5
                          className={
                            StaticPriceBreakDownCss.total_price_charges_text
                          }
                        >
                          {FindPropertyFeeChargeByName(Data?.name)}

                          {/* {Data?.name === "FIN"
                            ? "Cleaning Fee"
                            : Data?.name === "BED"
                            ? "Bed linen"
                            : Data?.name === "DEP"
                            ? "Security Deposit"
                            : Data?.name} */}
                        </h5>
                      </div>
                      <div
                        className={StaticPriceBreakDownCss.total_price_text_div}
                      >
                        <p className={StaticPriceBreakDownCss.total_price}>
                          ${Data?.value ? Data?.value : 0}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              );
            }
          )}

          {/* TAXES */}
          {props?.data?.NextpaxPriceBreakDown?.breakdown?.taxes?.itemized.map(
            (Data, Index) => {
              return (
                <>
                  {props?.data?.NextpaxPriceBreakDown?.breakdown?.taxes ===
                    {} ? (
                    ""
                  ) : (
                    <div
                      key={Index}
                      className={
                        StaticPriceBreakDownCss.total_price_charge_main_div
                      }
                    >
                      <div
                        className={StaticPriceBreakDownCss.total_price_text_div}
                      >
                        <h5
                          className={
                            StaticPriceBreakDownCss.total_price_charges_text
                          }
                        >
                          {/* {Data?.name ? Data?.name : "N/A"} */}

                          {FindRequiredTaxesChargeByName(Data?.name)}
                        </h5>
                      </div>
                      <div
                        className={StaticPriceBreakDownCss.total_price_text_div}
                      >
                        <p className={StaticPriceBreakDownCss.total_price}>
                          ${Data?.value ? Data?.value : 0}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              );
            }
          )}

          {/* SECURITY DEPOSIT FEE */}
          {props?.data?.NextpaxPriceBreakDown?.breakdown
            ?.requiredSecurityDeposit === 0 ? (
            ""
          ) : (
            <div
              className={StaticPriceBreakDownCss.total_price_charge_main_div}
            >
              <div className={StaticPriceBreakDownCss.total_price_text_div}>
                <h5
                  className={StaticPriceBreakDownCss.total_price_charges_text}
                >
                  Required Security Deposit
                </h5>
              </div>
              <div className={StaticPriceBreakDownCss.total_price_text_div}>
                <p className={StaticPriceBreakDownCss.total_price}>
                  $
                  {props?.data?.NextpaxPriceBreakDown?.breakdown
                    .requiredSecurityDeposit
                    ? props?.data?.NextpaxPriceBreakDown?.breakdown
                      ?.requiredSecurityDeposit
                    : 0}
                </p>
              </div>
            </div>
          )}

          {/* IF THERE IS NO CHARGES */}
          {props?.data?.NextpaxPriceBreakDown?.charges?.required.length === 0 &&
            props?.data?.NextpaxPriceBreakDown?.requiredTaxes.length === 0 ? (
            <p className={StaticPriceBreakDownCss.no_charges_text}>
              No Required Charges.
            </p>
          ) : (
            ""
          )}

          {/* STATIC 9% COMMISSION NEXTPAX*/}
          <div className={StaticPriceBreakDownCss.total_price_charge_main_div}>
            <div className={StaticPriceBreakDownCss.total_price_text_div}>
              <h5 className={StaticPriceBreakDownCss.total_price_charges_text}>
                Customer Service/Credit Card
              </h5>
            </div>
            <div className={StaticPriceBreakDownCss.total_price_text_div}>
              <p className={StaticPriceBreakDownCss.total_price}>
                $
                {CommissionCalc(
                  props?.data?.NextpaxPriceBreakDown?.breakdown?.rentOnly
                )
                  ? CommissionCalc(
                    props?.data?.NextpaxPriceBreakDown?.breakdown?.rentOnly
                  ) >= 0.5
                    ? Math.ceil(
                      CommissionCalc(
                        props?.data?.NextpaxPriceBreakDown?.breakdown
                          ?.rentOnly
                      )
                    )
                    : Math.floor(
                      CommissionCalc(
                        props?.data?.NextpaxPriceBreakDown?.breakdown
                          ?.rentOnly
                      )
                    )
                  : 0}
              </p>
            </div>
          </div>

          <div className={StaticPriceBreakDownCss.total_price_charge_main_div}>
            <div className={StaticPriceBreakDownCss.total_price_text_div}>
              <h5 className={StaticPriceBreakDownCss.total_charges_text}>
                Total Charges
              </h5>
            </div>
            <div className={StaticPriceBreakDownCss.total_price_text_div}>
              <p className={StaticPriceBreakDownCss.total_charges}>
                $
                {props?.data?.NextpaxPriceBreakDown?.breakdown?.total
                  ? props?.data?.NextpaxPriceBreakDown?.breakdown?.total >= 0.5
                    ? Math.ceil(
                      CommissionCalc(
                        props?.data?.NextpaxPriceBreakDown?.breakdown
                          ?.rentOnly
                      ) + props?.data?.NextpaxPriceBreakDown?.breakdown?.total
                    )
                    : Math.floor(
                      CommissionCalc(
                        props?.data?.NextpaxPriceBreakDown?.breakdown
                          ?.rentOnly
                      ) + props?.data?.NextpaxPriceBreakDown?.breakdown?.total
                    )
                  : 0}
              </p>
            </div>
          </div>

          <hr />
        </div>
      ) : (
        //* SECTION FOR RENTAL PRICE BREAKDOWN
        <div>
          {props?.data?.RentalpaxPriceBreakDown?.Message ===
            "StandardGuests must be smaller than CanSleepMax." ? (
            <>Guest Amount Limit Acceded</>
          ) : (
            <>
              <div
                className={StaticPriceBreakDownCss.total_price_charge_main_div}
              >
                <div className={StaticPriceBreakDownCss.total_price_text_div}>
                  <h5
                    className={StaticPriceBreakDownCss.total_price_charges_text}
                  >
                    $
                    {`${props?.data?.StartingFromPrice
                      ? props?.data?.StartingFromPrice >= 0.5
                        ? Math.ceil(props?.data?.StartingFromPrice)
                        : Math.floor(props?.data?.StartingFromPrice)
                      : 0
                      }
                         x ${props?.data?.NightsCounter} night`}
                  </h5>
                </div>
                <div className={StaticPriceBreakDownCss.total_price_text_div}>
                  <p className={StaticPriceBreakDownCss.total_price}>
                    $
                    {props?.data?.StartingFromPrice * props?.data?.NightsCounter
                      ? Math.round(props?.data?.StartingFromPrice * props?.data?.NightsCounter)
                      : 0}
                  </p>
                </div>
              </div>
              {props?.data?.RentalpaxPriceBreakDown?.TotalFeesTaxes?.map(
                (Data, Index) => {
                  return (
                    <div key={Index}>
                      <div
                        key={Index}
                        className={
                          StaticPriceBreakDownCss.total_price_charge_main_div
                        }
                      >
                        <div
                          className={
                            StaticPriceBreakDownCss.total_price_text_div
                          }
                        >
                          <h5
                            className={
                              StaticPriceBreakDownCss.total_price_charges_text
                            }
                          >
                            {Data?.Name ? Data.Name : "N/A"}
                          </h5>
                        </div>
                        <div
                          className={
                            StaticPriceBreakDownCss.total_price_text_div
                          }
                        >
                          <p className={StaticPriceBreakDownCss.total_price}>
                            ${Data?.Amount ? Math.round(Data?.Amount) : 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}

              {/* STATIC 9% COMMISSION RENTAL*/}
              <div
                className={StaticPriceBreakDownCss.total_price_charge_main_div}
              >
                <div className={StaticPriceBreakDownCss.total_price_text_div}>
                  <h5
                    className={StaticPriceBreakDownCss.total_price_charges_text}
                  >
                    Customer Service/Credit Card
                  </h5>
                </div>
                <div className={StaticPriceBreakDownCss.total_price_text_div}>
                  <p className={StaticPriceBreakDownCss.total_price}>
                    $
                    {Math.round(
                      CommissionCalc(
                        Math.round(
                          Number(props?.data?.RentalpaxPriceBreakDown?.Rent)
                        )
                      )
                    )}
                  </p>
                </div>
              </div>
            </>
          )}

          <div className={StaticPriceBreakDownCss.total_price_charge_main_div}>
            <div className={StaticPriceBreakDownCss.total_price_text_div}>
              <h5 className={StaticPriceBreakDownCss.total_charges_text}>
                Total Charges
              </h5>
            </div>
            <div className={StaticPriceBreakDownCss.total_price_text_div}>
              <p className={StaticPriceBreakDownCss.total_charges}>
                $
                {Math.round(
                  Number(props?.data?.RentalpaxPriceBreakDown?.Rent)
                ) +
                  SumAmountCharges +
                  Math.round(
                    CommissionCalc(
                      Math.round(
                        Number(props?.data?.RentalpaxPriceBreakDown?.Rent)
                      )
                    )
                  )}
              </p>
            </div>
          </div>
          <hr />
        </div>
      )}
    </>
  );
};

export default StaticPriceBreakDown;
