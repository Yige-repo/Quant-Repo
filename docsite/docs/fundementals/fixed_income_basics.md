---
id: fixed_income_basics
title: Fixed Income – Core Concepts
sidebar_label: FI Basics
---

# Fixed Income – Core Concepts

This page establishes **a unified, physics-style vocabulary** for fixed-income and
interest-rate products.  
All later topics (bonds, swaps, FRNs, curves, DV01, XVA) rely on these definitions.

---

# 1. Cash Flow (CF)

A **cash flow** is the *actual* amount of money contractually paid at a future time.

- Determined **only** by the contract.
- **Does not change** when market interest rates change.

Examples:
- A 5% coupon on a 100 notional → CF = 5 every period.
- Principal redemption → CF = 100 at maturity.

We denote the $ i $-th cash flow:

$$
CF_i \quad \text{at time } t_i.
$$

---

# 2. Discount Factor (DF)

A **discount factor** converts a future cash flow into today’s value:

$$
PV = CF \cdot DF(0, T)
$$

Key properties:

- Determined by **market interest rates**, not by the contract.
- Always between $ 0 $ and $ 1 $.
- Higher interest rate → **smaller** DF → smaller PV.

For continuous compounding:

$$
DF(0,T) = e^{-rT}.
$$

Interpretations:
- “Future money is worth less today.”
- “DF is the time-value compression factor.”

---

# 3. Present Value (PV)

The price of any fixed-income instrument is the sum of discounted cash flows:

$$
P = \sum_{i=1}^n CF_i \cdot DF(0, t_i)
$$

This is the **mother formula** of all interest-rate pricing.

Bonds, swaps, FRNs, forwards, CVA, XVA—everything reduces to this structure.

---

# 4. Coupon Rate vs Market Rate

## 4.1 Coupon Rate $ c $
- Written in the contract.
- Determines **cash flows**.
- Does **not** react to the market.

Example:
- 5% coupon on 100 notional → CF = 5 each period.

## 4.2 Market Rate / Yield $ r $
- Comes from **current market pricing**.
- Determines **discount factors**, not cash flows.

This difference is essential:

> **CF is contract-defined.  
> DF is market-defined.**

---

# 5. Yield (YTM)

Yield-to-maturity $ y $ is the **single rate** that makes the PV of cash flows
equal to the price:

$$
P = \sum_{i=1}^n \frac{CF_i}{(1 + y/m)^{m t_i}}
$$

- If yield ↑ → price ↓  
- If yield ↓ → price ↑

Because yield ↑ → DF ↓ → PV ↓.

---

# 6. Zero-Coupon vs Fixed Coupon

## Zero-Coupon (ZC)
A single payment at maturity:

$$
PV_{\text{ZC}} = N \cdot DF(0, T)
$$

ZC bonds are the **atoms** of the interest-rate world.

## Fixed Coupon
Payment stream:

- Coupon payments
- Final principal redemption

Cash flows:

$$
CF_i = \begin{cases}
N c \Delta_i, & i = 1, \dots, n-1 \\
N c \Delta_i + N, & i = n
\end{cases}
$$

---

# 7. The Price–Yield Relationship

For instruments with **all positive cash flows**:

- Price is a **strictly decreasing** function of yield.
- Intuition:
  
  > Higher market rate → DF smaller → PV smaller → price lower.

Graphically: downward-sloping, convex curve.

---

# 8. Forward Rates and DF Relationship (Preview)

A continuous forward rate $ f(0,T) $ satisfies:

$$
DF(0,T) = \exp\left(-\int_0^T f(0,s)\, ds\right)
$$

We will use this later for yield curve construction and swaps.

---

# 9. Unified Notation Summary

| Concept | Symbol | Meaning |
|--------|--------|---------|
| Cash flow | $ CF_i $ | Contractual payment at time $ t_i $ |
| Discount factor | $ DF(0, t_i) $ | Market-implied present value multiplier |
| Present value | $ PV $ | $ \sum CF \cdot DF $ |
| Coupon rate | $ c $ | Contractual rate, defines CF |
| Market yield | $ y $ | Implied discount rate from market price |
| Notional | $ N $ | Face value / principal |
| Year fraction | $ \Delta_i $ | Accrual for period $ i $ |

All fixed-income pricing uses this notation map.

---

# 10. Core Philosophy (for Quant mindset)

- Contracts define **CF**  
- Markets define **DF**  
- Pricing = CF structured + DF applied  
- Risk comes from **DF reacting to market changes**

This framework will carry through all further chapters.

