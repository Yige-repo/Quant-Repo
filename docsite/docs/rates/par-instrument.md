# Par Instruments

"Par" means the instrument is priced exactly at its face value:
- 100 for bonds  
- 1.00 for swaps/FRNs (notional normalized)

Par = fair value = no premium / no discount = PV = notional.

---

## 1. Par Bond

A bond priced at 100.

Occurs when:

$$
\text{coupon rate} = \text{market yield}
$$

---

## 2. Par Swap

A swap where fixed leg PV equals floating leg PV.

$$
PV_{\text{fixed}} = PV_{\text{float}} = 1
$$

The fixed rate that satisfies this condition is the **par swap rate**.

---

## 3. Par FRN (Floating Rate Note)

After each reset, the FRN’s PV returns to 100.

Because:

$$
\text{coupon} = \text{forward rate} \times \text{accrual}
$$

FRN pricing always resets to par.

---

## 4. Why par instruments are used in bootstrapping

They generate clean, solvable equations:

- deposit → simple DF  
- futures → forward → DF  
- swap → par condition → DF  

Market quotes are given in **par space** because they are:

- transparent  
- liquid  
- easy to compare  
- standardized for trading  

Par instruments are the building blocks of the entire yield curve.
