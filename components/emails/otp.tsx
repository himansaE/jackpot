/* eslint-disable @next/next/no-img-element */
import { URLWithParams } from "@/lib/utils-client";

type EmailOTPComponentProps = {
  email: string;
  name: string;
  url: string;
  otp: string;
};
import React from "react";

export const EmailOTPComponent = (props: EmailOTPComponentProps) => {
  const containerStyle: React.CSSProperties = {
    fontFamily: "Poppins, Lato ,'Google Sans', 'Roboto'",
    margin: 0,
    padding: 0,
    backgroundColor: "#f5f5f5",
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderSpacing: 0,
    borderCollapse: "collapse",
  };

  const tdStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "5px 0",
  };

  const imageStyle: React.CSSProperties = {
    display: "block",
    margin: "0 auto",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333333",
    marginTop: "20px",
  };

  const subHeadingStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "15px",
  };

  const codeBlockStyle: React.CSSProperties = {
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    padding: "10px 25px",
    fontSize: "30px",
    fontWeight: "bold",
    color: "#000000",
    display: "inline-block",
    letterSpacing: "8px",
  };

  return (
    <>
      <table
        role="presentation"
        style={containerStyle}
        width="100%"
        cellSpacing={0}
        cellPadding={0}
        border={0}
      >
        <tbody>
          <tr>
            <td style={tdStyle}>
              <table
                style={tableStyle}
                width="600"
                cellSpacing={0}
                cellPadding={0}
                border={0}
              >
                <tbody>
                  <tr>
                    <td style={tdStyle}>
                      <table
                        width="100%"
                        cellSpacing={0}
                        cellPadding={0}
                        border={0}
                        style={{ backgroundColor: "#f5f5f5" }}
                      >
                        <tbody>
                          <tr>
                            <td style={tdStyle}>
                              <div
                                style={{
                                  margin: "20px 0 0 0",
                                }}
                              >
                                <a href={`${URLWithParams("/", [])}`}>
                                  <img
                                    src={`${URLWithParams(
                                      "/static/images/logo_inline.png",
                                      [],
                                    )}`}
                                    alt="Jackpot logo"
                                    width="209"
                                    height="54"
                                    style={imageStyle}
                                  />
                                </a>
                              </div>
                              <h1 style={headingStyle}>Password Reset code</h1>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style={tdStyle}>
              <table
                style={{
                  ...tableStyle,
                }}
                width="600"
                cellSpacing={0}
                cellPadding={0}
                border={0}
              >
                <tbody>
                  <tr>
                    <td style={tdStyle}>
                      <table
                        width="100%"
                        cellSpacing={0}
                        cellPadding={0}
                        border={0}
                        style={{ backgroundColor: "#ffffff" }}
                      >
                        <tbody>
                          <tr>
                            <td style={{ ...tdStyle, padding: "10px" }}>
                              <h2 style={subHeadingStyle}>Hi {props.name}</h2>
                              <p>
                                Here is the Password Reset code for your Jackpot
                                account.
                              </p>
                              <div
                                style={{
                                  marginTop: "20px",
                                  textAlign: "center",
                                }}
                              >
                                <div style={codeBlockStyle}>{props.otp}</div>
                              </div>
                              <p
                                style={{
                                  margin: "20px 0 0 0 ",
                                }}
                              >
                                This code will expire shortly. If the code is
                                expired,{" "}
                                <a
                                  href={`${URLWithParams("/auth/forget", [
                                    ["email", props.email],
                                  ])}`}
                                >
                                  reset here
                                </a>
                                .
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
