---
id: bonds
title: Bonds
sidebar_label: Bonds
---

# Bonds

## 1. What is a bond?

- A bond is a fixed-income instrument representing a loan made by an investor to a borrower.
- Key attributes:
  - Notional (Face Value)
  - Maturity date
  - Coupon rate & type (fixed / floating)
  - Payment frequency
  - Currency
  - Issuer type (sovereign, corporate, etc.)

---

## 2. Cashflow structure

### 2.1 Zero-coupon bond

- Single cashflow at maturity: repayment of notional.
- No intermediate coupon payments.

Notation:

- $N$: notional  
- $T$: maturity  
- $DF(0, T)$: discount factor from today to $T$

Present value:

$$
PV_{\text{ZC}} = N \cdot DF(0, T)
$$

---

### 2.2 Fixed coupon bond

- Regular coupon payments + principal redemption at maturity.

Let:

- $c$: annual coupon rate  
- $m$: payments per year (e.g. 2 for semi-annual)  
- $t_i$: payment dates  
- $\Delta_i$: year fraction of period $i$

Cashflow at $t_i$:

For $i = 1, \dots, n-1$:

$$
CF_i = N \cdot c \cdot \Delta_i
$$

For $i = n$:

$$
CF_n = N \cdot c \cdot \Delta_n + N
$$

Present value:

$$
PV_{\text{fixed}} = \sum_{i=1}^{n} CF_i \cdot DF(0, t_i)
$$

---

### 2.3 Floating rate note (FRN) – 简略版先留坑

- Coupon linked to an index rate (e.g. 3M LIBOR / SOFR) + spread.
- Detailed pricing (reset / fixing / in-arrears) will be added later.

---

## 3. Yield and price–yield relationship

### 3.1 Yield to Maturity (YTM)

- YTM is the constant discount rate $y$ that equates the present value of cashflows to market price $P$.

Solve for $y$ from:

$$
P = \sum_{i=1}^{n} \frac{CF_i}{(1 + y/m)^{m t_i}}
$$

- 直觉：YTM 越高，价格越低；YTM 越低，价格越高。

---

### 3.2 Price–yield curve

- Convex and downward-sloping.
- Duration measures first-order sensitivity of price to yield.
- Convexity measures second-order sensitivity.

---

## 4. Main risks

- **Interest rate risk**  
  - Measured by DV01 / duration / key rate duration.

- **Credit risk**  
  - Default probability, recovery rate, spread.

- **Liquidity risk**  
  - Bid–ask spread, market depth.

- **Optionality**（如果是 callable/puttable bond）  
  - Embedded options → non-linear pricing.

---

## 5. Types of bonds (overview)

- By coupon type:
  - Zero-coupon bond  
  - Fixed coupon bond  
  - Floating rate note (FRN)  
  - Step-up / step-down coupon  

- By issuer:
  - Government  
  - Agency  
  - Corporate  
  - Municipal  

- By optionality:
  - Straight bond (no option)  
  - Callable / puttable  
  - Convertible  

---

## 6. TODO / Notes

- Add detailed FRN pricing  
- Add Duration / Convexity as a standalone page  
- Optionality & callable bond section later  
