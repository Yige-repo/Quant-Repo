# Bootstrapping the Yield Curve

Bootstrapping = constructing discount factors from market par instruments:
- deposits (short end)
- futures or FRAs (middle)
- swaps (long end)

Build DF(0,T) one maturity at a time.

---

## 1. Step-by-step logic

### Step 1: Use deposits

$$
DF(0,T) = \frac{1}{1 + r \Delta}
$$

### Step 2: Use futures (get forward rate)

$$
DF(0,T_2) = DF(0,T_1) \cdot e^{-f(T_1,T_2)(T_2 - T_1)}
$$

### Step 3: Use swaps  
Par condition:

$$
PV_{\text{fixed}} = PV_{\text{float}} = 1
$$

Solve for the unknown DF at the swap maturity.

---

## 2. Mini Example (1Y deposit + 2Y swap)

Given:
- 1Y deposit: 5%
- 2Y par swap rate: 6%

### Compute DF(1):

$$
DF_1 = \frac{1}{1.05} = 0.95238
$$

### Par swap equation:

$$
0.06 \cdot DF_1 + 0.06 \cdot DF_2 = 1 - DF_2
$$

Solve:

$$
DF_2 = 0.88949
$$

---

## 3. Zero rates from DF

$$
R(0,T) = -\frac{1}{T} \ln (DF(0,T))
$$

---

## 4. Forward rates from DF

$$
f(T_1, T_2) = -\frac{1}{T_2 - T_1} 
\ln\!\left(\frac{DF_2}{DF_1}\right)
$$

Bootstrapping converts imperfect market quotes into a smooth,
arbitrage-free DF curve.
