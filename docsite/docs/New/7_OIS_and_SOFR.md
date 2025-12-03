---
id: ois-and-sofr
title: OIS Curve, SOFR, and Term Structure
sidebar_label: OIS & SOFR
---

# OIS Curve, SOFR, and Term Structure

This chapter summarizes the modern interest-rate framework based on  
**SOFR**, **Compounded SOFR**, **Term SOFR**, and the **OIS (Overnight Index Swap) curve**.

These components form the foundation of discounting, forward rates,  
swap pricing, and exposure modeling.

---

# 1. The SOFR Family

## 1.1 SOFR (Secured Overnight Financing Rate)

- Published daily by the NY Fed  
- Based on Treasury repo market  
- True overnight, nearly risk-free  
- The fundamental building block of the USD risk-free curve

SOFR itself is **not** forward-looking.

---

## 1.2 Compounded SOFR (Backward-Looking Rate)

Compounded SOFR is obtained by compounding daily SOFR over an accrual period:

$$
SOFR_{comp}
=
\left(
\prod_{i=1}^{n}
(1 + r_i \cdot \Delta_i)
\right)
- 1
$$

Used for:

- IRS floating leg cashflows  
- OIS floating leg  
- Discounting curve construction (OIS)

Compounded SOFR is **retrospective**, determined only at the end of the period.

---

## 1.3 Term SOFR (Forward-Looking Rate)

- Published by CME  
- Derived from SOFR futures  
- Known at the beginning of the period  
- Usable mainly for loans and non-derivative products

Not used for discounting or risk-free forward curves.

---

# 2. OIS (Overnight Index Swap)

OIS exchanges:

- **Fixed rate**  
- vs **Compounded SOFR**

The traded quantity is the **fixed rate**, not the compounded leg.

OIS markets are liquid across maturities:

- 1m, 3m, 6m  
- 1y–30y tenor OIS swaps

Thus, OIS swaps anchor the entire risk-free yield curve.

---

# 3. Building the OIS Curve

Inputs used in bootstrapping:

1. Overnight deposit  
2. SOFR futures  
3. OIS swap rates across maturities

Bootstrap objective:

> Solve discount factors $ DF(t) $ such that  
> the PV of each market instrument equals its market price.

Forward rates are then obtained from discount factors:

$$
1 + f(t_1, t_2)(t_2 - t_1)
=
\frac{DF(t_1)}{DF(t_2)}
$$

Forward rates are **curve-implied**, not published.

---

# 4. Forward Rates vs Term SOFR

- **Forward Rate:** implied from discount factors  
- **Term SOFR:** CME-published fixing from futures  
- **Compounded SOFR:** realized historical compounding

These three concepts differ fundamentally.

Summary:

| Rate Type | Nature | Source |
|----------|--------|--------|
| Forward Rate | Implied, forward-looking | Bootstrapped OIS curve |
| Term SOFR | Published, forward-looking | CME SOFR futures |
| Compounded SOFR | Realized, backward-looking | Daily SOFR compounding |

---

# 5. FRA vs FRN (Frequently Confused)

## 5.1 FRA (Forward Rate Agreement)

- Cash-settled difference of future fixed vs floating  
- No exchange of notionals  
- Purely a rate bet

## 5.2 FRN (Floating Rate Note)

- Bond that pays floating coupon each period  
- Coupon = forward rate × accrual  
- Resets to par at each reset date

FRN is essentially the **floating leg of a par swap** made into a bond.

---

# 6. Quote vs Price

- **Price:** present value after discounting  
- **Quote:** market convention used to express price  
  - swap rate  
  - yield  
  - spread  
  - volatility  

Example:

- Swap **quote** = swap rate that makes PV = 0 (par rate)  
- Swap **price** = actual PV (≈ 0 for par swap, but not always)

---

# 7. Market Conventions

## 7.1 Basis Point

1 bp = 0.01% = 1/10000

Used across:

- DV01  
- PV01  
- Swap spreads  
- Curve shifts  

## 7.2 Discounting

Modern USD discounting uses the **SOFR OIS curve**, not LIBOR.

---

# 8. Key Takeaways

- SOFR → fundamental overnight rate  
- Compounded SOFR → used for floating cashflows  
- Term SOFR → CME forward-looking rate (not for discounting)  
- OIS swaps → build the risk-free curve  
- Forward rates come from discount factors, not SOFR itself  
- FRA ≠ FRN  
- Quote ≠ Price  

This OIS/SOFR framework is the foundation of modern derivative pricing.
