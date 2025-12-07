# Interest Rate Models

## 1. Introduction
Interest rate models describe how future interest rates evolve over time.  
They provide the stochastic process behind rates and are required for:

- Zero-coupon bond pricing  
- Swap pricing  
- Swaption pricing  
- Risk (DV01 / PV01 / IR01)  
- Exposure simulation (EE, EPE, PFE, XVA)

Short-rate models directly model the instantaneous short rate $ r_t $:

$$
dr_t = \text{drift}(t,r_t)\,dt + \text{vol}(t,r_t)\,dW_t
$$

Two components:

- Deterministic drift → long-term tendency / curve calibration  
- Stochastic diffusion → randomness (Brownian motion)

---

## 2. Short-Rate Models (Overview)

Short-rate models specify the evolution of $ r_t $.  
Common models:

- Vasicek Model  
- Hull–White One-Factor Model (HW1F)  
- Hull–White Two-Factor Model (HW2F)  
- CIR Model  
- Extended short-rate models (CIR++, G2++, etc.)

---

## 3. Vasicek Model (Comparison Baseline)

The Vasicek model is the simplest mean-reverting short-rate model:

$$
dr_t = a(b - r_t)\,dt + \sigma\,dW_t
$$

Where:

- **a** — mean-reversion speed  
- **b** — long-term mean  
- **σ** — volatility

Key properties:

- Linear SDE → **Gaussian** process  
- Short rate can become negative (normal distribution)  
- Bond price has closed-form **exponential-affine** formula  
- Curve cannot match arbitrary market shapes (smooth, exponential type only)

Why Vasicek matters:

- It is the ancestor of Hull–White: HW simply replaces constant $b$ with a time-dependent $\theta(t)$ to fit today’s curve.
- Provides intuition for Gaussian affine term-structure models.

Vasicek structure:

$$
r_t = b + (r_0 - b)e^{-at} +
\sigma\int_0^t e^{-a(t-s)} dW_s
$$

Interpretation:

- Deterministic part decays exponentially toward $b$  
- Noise is exponentially damped → OU process  
- Leads to tractable closed-form bond pricing

---

## 4. Hull–White One-Factor Model (HW1F)

### 4.1 Model Definition

$$
dr_t = a(\theta(t) - r_t)\,dt + \sigma\,dW_t
$$

Where:

- $a$: Mean-reversion speed  
- $\theta(t)$: Time-dependent drift (curve-fitting function)  
- $\sigma$: Volatility  
- $W_t$: Brownian motion

Properties:

- Linear SDE → Gaussian process  
- Drift pulls $r_t$ toward $\theta(t)$  
- Noise term contributes uncertainty ~ $\sqrt{dt}$

---

### 4.2 Why Hull–White?

Limitations of Vasicek:

$$
dr_t = a(b - r_t)\,dt + \sigma dW_t
$$

- Uses constant long-term mean $b$  
- Can only produce smooth exponential-type yield curves  
- Cannot fit real market curves (inverted / humped / non-monotonic)

Advantage of Hull–White:

Replace constant $b$ with time-dependent $\theta(t)$:

- $\theta(t)$ is calibrated from market zero-coupon curve  
- Allows perfect fit to today's entire yield curve  
- Ensures model is arbitrage-free relative to market data

---

### 4.3 Calibration: Determining $\theta(t)$

Calibration condition:

$$
P^{HW}(0,T) = P^{mkt}(0,T)
$$

Hull–White bond price:

$$
P(0,T) = A(0,T)\exp(-B(0,T)r_0)
$$

Where:

$$
B(0,T) = \frac{1 - e^{-aT}}{a}
$$

This implies:

$$
A(0,T) = P^{mkt}(0,T)\, e^{B(0,T) r_0}
$$

Using the relationship between $A(0,T)$ and $\theta(t)$, we obtain:

$$
\theta(t)
=
\frac{\partial f(0,t)}{\partial t}
+ a f(0,t)
+ \frac{\sigma^2}{2a}(1 - e^{-2at})
$$

Where $f(0,t)$ is the instantaneous forward curve from market data.

Interpretation:

- $\theta(t)$ ensures the model reproduces today's observed yield curve  
- Future randomness is driven only by $\sigma dW_t$, not by $\theta(t)$

---

### 4.4 Closed-Form Bond Price

Under HW1F:

$$
P(t,T) = A(t,T)\exp(-B(t,T)r_t)
$$

Where:

$$
B(t,T) = \frac{1-e^{-a(T-t)}}{a}
$$

- $B(t,T)$: Sensitivity of bond price to the short rate  
- $A(t,T)$: Adjustment term ensuring curve fit (depends on $\theta(t)$)

Reason bond price is exponential-affine:

- $r_t$ is Gaussian  
- $\int_t^T r_s ds$ is Gaussian  
- Expectation of $\exp(\text{Gaussian})$ has closed form

---

### 4.5 Monte Carlo Simulation

Euler discretization:

$$
r_{t+\Delta t}
=
r_t
+ a(\theta(t)-r_t)\Delta t
+ \sigma\sqrt{\Delta t}\,Z
$$

Where $Z \sim N(0,1)$.

Interpretation:

- Drift term reverts toward $\theta(t)$  
- Diffusion term introduces $\sqrt{dt}$-scale randomness  
- $\theta(t)$ is deterministic and fixed after calibration

---

### 4.6 Economic Interpretation

- **a** → Speed of mean reversion  
- **σ** → Strength of future uncertainty  
- **$\theta(t)$** → Target path needed to match today’s curve  

Meaning:

> Start exactly from today’s market curve,  
> then let rates evolve stochastically with mean reversion.

---

### 4.7 Why Hull–White is Important

Advantages:

- Fits any initial yield curve  
- Closed-form bond prices  
- Closed-form swap & swaption pricing (Jamshidian)  
- Gaussian → easy Monte Carlo  
- Used in:
  - Market risk  
  - XVA  
  - Exposure simulation  
  - Structured rate products

---

## 5. Hull–White Two-Factor (HW2F)

The one-factor Hull–White model can fit the initial curve but cannot generate realistic yield-curve dynamics.  
Historical yield curves move primarily via:

1. Level  
2. Slope  
3. Curvature  

A single factor cannot capture more than one mode.  
HW2F adds a second Gaussian factor to model richer curve motions.

---

### 5.1 Model Definition

Short rate:

$$
r_t = x_t + y_t + \phi(t)
$$

Factors:

$$
dx_t = -a x_t\,dt + \sigma\, dW_t^{(1)}
$$

$$
dy_t = -b y_t\,dt + \eta\, dW_t^{(2)}
$$

with:

- $\rho = \text{corr}(W^{(1)}, W^{(2)})$  
- $a$: fast mean-reverting speed  
- $b$: slow mean-reverting speed  
- $\phi(t)$: fits today’s OIS curve (same logic as HW1F)

Interpretation:

- $x_t$ → short-end moves  
- $y_t$ → long-end moves  
- Correlation $\rho$ controls how steepeners/flatteners behave

---

### 5.2 Why HW2F?

Limit of HW1F:

> All maturities are perfectly correlated.

HW2F introduces:

- Imperfect correlation  
- Realistic curve deformation  
- Ability to match PCA of yield movements (level + slope)

Thus:

- Much better swaption calibration  
- Better exposure profiles  
- More realistic term-structure dynamics

---

### 5.3 Bond Price Closed Form

Affine structure is preserved:

$$
P(t,T) = \exp\big(A(t,T) - B_1(t,T)x_t - B_2(t,T)y_t\big)
$$

Where:

$$
B_1(t,T) = \frac{1 - e^{-a(T-t)}}{a}, \quad
B_2(t,T) = \frac{1 - e^{-b(T-t)}}{b}
$$

$A(t,T)$ includes convexity corrections and $\phi(t)$.

---

### 5.4 Forward Rate Volatility

Instantaneous forward volatility:

$$
\sigma_f(t,T)
=
\sigma e^{-a(T-t)}
+
\eta e^{-b(T-t)}
$$

Meaning:

- Short maturities load heavily on factor 1  
- Long maturities load on factor 2  
- Term-structure of vol is smooth and realistic  

---

### 5.5 Swaption Pricing

Unlike HW1F, there is **no Jamshidian decomposition**.

Practical pricing methods:

- Analytic approximations (G2++ equivalence)  
- PDE  
- Monte Carlo  

Vendors (Numerix, Murex, Bloomberg) provide fast, calibrated HW2F implementations.

Calibration quality >> HW1F, especially for long expiry/long tenor swaptions.

---

### 5.6 Calibration Strategy

Typical steps:

1. Fit $\phi(t)$ to the OIS curve  
2. Fit $a, b, \sigma, \eta, \rho$ to swaption vol surface  

Rules of thumb:

- $a > b$ : fast vs slow factor  
- $\rho < 0$ matches typical market steepener behavior  
- $\sigma/\eta$ tunes relative short / long end volatility  

---

### 5.7 HW1F vs HW2F Summary

| Feature | HW1F | HW2F |
|--------|------|------|
| Factors | 1 | 2 |
| Curve movements | Level only | Level + slope |
| Correlation across maturities | 100% | Realistic |
| Swaption calibration | Weak | Strong |
| Speed | Very fast | Moderate |
| Simulation | Easy | Still feasible |
| Industry use | Basic risk engines | XVA, structured desks, advanced risk |

HW2F is widely considered the minimal realistic Gaussian short-rate model.

---

## 6. CIR Model (Non-Negative Short Rate)

The CIR model modifies the diffusion term to prevent negative rates:

$$
dr_t = a(b - r_t)\,dt + \sigma\sqrt{r_t}\,dW_t
$$

Key differences vs Vasicek:

| Feature | Vasicek | CIR |
|--------|---------|-----|
| Diffusion | constant σ | σ√r |
| Distribution | Gaussian | non-central χ² |
| Rate negativity | possible | prevented (Feller condition) |
| Curve fitting | cannot | cannot (without shift) |

**Feller condition** ensures strict positivity:

$$
2ab \ge \sigma^2
$$

Interpretation:

- When rates fall toward zero, volatility shrinks  
- Makes it harder to “bounce into negative territory”

Despite being non-Gaussian, CIR still yields exponential-affine bond prices.

Modern usage:

- Credit risk (hazard rates must be ≥0)  
- Emerging-market rate models  
- Sometimes used in shifted form (**CIR++**) to match today’s curve

---

## 7. HJM Framework (General No-Arbitrage Forward-Curve Dynamics)

HJM models the entire instantaneous forward curve $f(t,T)$:

$$
df(t,T) = \alpha(t,T)\, dt + \sigma(t,T)\, dW_t
$$

Where:

- $t$ = current time  
- $T$ = maturity  
- $f(t,T)$ = instantaneous forward rate  
- $\sigma(t,T)$ = forward-rate volatility term structure

### 7.1 Infinite-dimensional nature

For each maturity $T$, forward rate has its own SDE.  
Since maturities are continuous, forward curve is **infinite-dimensional**.

A model for $f(t, T_1)$ tells you nothing about $f(t,T_2)$ unless you specify the whole surface.

### 7.2 No-arbitrage drift condition (HJM core result)

In the risk-neutral measure:

$$
\alpha(t,T)
=
\sigma(t,T)\int_t^T \sigma(t,u)\,du
$$

Meaning:

- **Volatility fully determines drift**  
- Drift is *not* a free parameter  
- Arbitrage is avoided only if forward curve drift satisfies this condition

This is the opposite of short-rate models, where we freely choose drift ($\theta(t)$) and discounting ensures no-arbitrage.

### 7.3 Why HJM matters

- Most general arbitrage-free curve model  
- Everything else (HW, G2++, LMM) is essentially **finite-factor or discrete versions of HJM**  
- Used as theoretical foundation, not for direct simulation (too expensive)

---

## 8. Libor Market Model (LMM / BGM)

LMM models **market-observable forward LIBOR rates**:

Forward LIBOR from $T_i$ to $T_{i+1}$:

$$
L_i(t) = L(t, T_i, T_{i+1})
$$

### 8.1 Key assumption

Under the $T_{i+1}$-forward measure:

$$
dL_i(t)
=
\sigma_i(t)L_i(t) dW_t^{(i)}
$$

- **drift = 0** in its own forward measure → lognormal  
- Perfectly consistent with Black’s formula for caplets  
- Easy calibration to swaption vol surfaces

This is HJM with:

- discrete maturities  
- lognormal dynamics  
- one measure per forward

### 8.2 Why drift “disappears”

Because measure-change absorbs the drift:

- In risk-neutral measure: drift contains HJM-style $\sigma^2$ integrals  
- In forward measure: $L_i(t)$ becomes a martingale → drift = 0  
- The complicated HJM no-arbitrage drift hides inside the Radon–Nikodym derivative

### 8.3 Practical implications

- **Pricing:** very convenient (caplets, swaptions)  
- **Simulation:** expensive  
  - Must simulate all forwards under a *single* measure  
  - Only one forward has zero drift  
  - Others regain complex drift structures  
- Typically used for derivative pricing, not exposure/XVA simulations

---

## 9. Multi-Curve Models (OIS Discounting vs LIBOR Forwarding)

Post-2008, the market moved from a **single-curve** world to a **multi-curve** world.

Before 2008:

- One LIBOR curve provided both **discount factors** and **forward rates**

After 2008:

- Discounting must use **OIS curve** (close to risk-free collateral rate)  
- Forward rates use **tenor-specific curves** (1M, 3M, 6M, etc.)  
- Basis spreads between tenors must be modeled explicitly

### 9.1 Core structure

- **Discount curve:** OIS  
- **Forward curves:** one per tenor  
- **Basis curve:** difference between forward tenors (e.g., 3M–6M)

Forward rate from tenor $x$:

$$
F^{(x)}(t, T_i, T_{i+1})
=
\frac{1}{\delta_x}
\left(
\frac{P_x(t, T_i)}{P_x(t, T_{i+1})} - 1
\right)
$$

PV under multi-curve:

$$
PV = \sum_i \text{Cashflow}_i \cdot DF_{\text{OIS}}(t_i)
$$

### 9.2 Relationship with models

- **HW**: typically models OIS curve dynamics only  
- **LMM**: models forward LIBOR dynamics; discounting still uses OIS  
- Multi-curve bootstrapping provides deterministic initial curves

### 9.3 Why multi-curve is essential

- LIBOR ≠ risk-free  
- Collateralized swaps must be discounted at OIS  
- Single-curve pricing yields incorrect swap and swaption values  
- Required for accurate risk (DV01 decomposition, XVA)

---

## 10. Pricing Applications

### 10.1 Bonds  
- Short-rate affine models (Vasicek, HW, CIR) give closed-form bond prices  
- Multi-curve environment: discount using OIS DF

### 10.2 Swaps  
- Floating leg forwards from tenor-specific curve  
- Discount with OIS curve  
- In HW: swap price obtained via closed-form expectation against short-rate distribution

### 10.3 Swaptions  
- HW: closed form via Jamshidian (for payer/receiver)  
- LMM: natural lognormal structure, matches swaption vol surface  
- SABR/local-vol added when smile calibration is required

---

## 11. Risk Applications

### 11.1 DV01 / PV01 / IR01  
- Sensitivity to specific curve bumps (OIS / 3M / 6M / basis)

### 11.2 Scenario risk  
- Shifts to forward curves and discount curves separately  
- Multi-curve structure separates discount risk from tenor risk

### 11.3 Exposure (EE / EPE / PFE)  
- HW widely used (fast simulation, Gaussian)  
- LMM possible but costly (complex drift under single measure)

### 11.4 XVA  
- Discounting uses OIS  
- Forward exposure depends on forward-tenor curves  
- Short-rate models often preferred for computational efficiency

---

## 12. Brownian Motion & Distribution Assumptions

Short-rate models use Brownian motion to introduce randomness into rate evolution.

### 12.1 Brownian Motion Basics

Brownian motion $W_t$ is defined by:

- $W_0 = 0$
- $W_{t+\Delta t} - W_t \sim N(0, \Delta t)$
- Independent increments

Continuous-time notation:

$$
dW_t \sim N(0, dt)
$$

Simulation form:

$$
dW_t \approx \sqrt{\Delta t}\, Z,\quad Z \sim N(0,1)
$$

Meaning:

- Randomness grows with **$\sqrt{\Delta t}$**, not $\Delta t$.  
- Over a horizon $T$,

  $$
  W_T \sim N(0, T) = \sqrt{T} Z
  $$

This explains why many formulas contain $\sqrt{T}$ terms.

---

### 12.2 Normal vs. Lognormal Models

“Normal vs. lognormal” refers to the **distribution of the model variable**, *not* $dW_t$.

#### Normal-Type Model  
Example: Hull–White / Vasicek

$$
dr_t = a(\theta(t) - r_t)\,dt + \sigma\,dW_t
$$

Characteristics:

- Additive noise → $r_t$ is Gaussian.  
- Rates can be negative.  
- Good for curve calibration, XVA, risk.

#### Lognormal-Type Model  
Example: Black / Black–Scholes

$$
dS_t = \mu S_t dt + \sigma S_t dW_t
$$

- Multiplicative noise → $\ln S_T$ normal → $S_T$ lognormal.  
- Ensures positivity.  
- Used when the underlying is a tradable price.

---

### 12.3 What Is the Distribution of $dS_t$?

$dS_t$ itself is not assigned a “distribution name.”  
In discrete form:

$$
\Delta S \approx \mu S_t \Delta t + \sigma S_t \sqrt{\Delta t} Z
$$

The randomness is local; what matters is:

- $S_T$ distribution (lognormal)  
- integrals of $r_t$ (Gaussian)

Models are classified by **terminal distribution**, not by $dW_t$ or $dS_t$.

---

## 13. Market Data & Daily Calibration

Interest rate models must align with **today’s market curve**.  
This requires *daily calibration*.

### 13.1 What Counts as Market Data?

Typical market inputs:

#### Curve Instruments
- OIS / SOFR: overnight, futures, OIS swaps  
- IBOR curves: FRAs, futures, IRS  
- Treasury yields  
- Deposit rates  

#### Volatility Data
- Swaption vol surface  
- Cap/Floor vols  
- Futures option vols  

#### Price/Spread Instruments
- Bond prices  
- CDS spreads  

These are updated daily (or intraday) and form the basis of calibration.

---

### 13.2 Why Daily Calibration?

Short-rate models must satisfy:

$$
P^{model}(0,T) = P^{market}(0,T)
$$

Because:

- The market curve changes every day.  
- Risk measures (DV01, IR01, PFE, XVA) depend on **today’s** yield curve.  
- Exposure simulation must begin from the correct initial state.

Process:

1. Bootstrap discount factors from market instruments.  
2. Compute forward rates.  
3. Derive $\theta(t)$ (for HW) or curve-shifting terms (CIR++, G2++).  
4. Optionally calibrate vol parameters (e.g., $\sigma$, $a$) to swaption smile.

Meaning:

> Calibration “anchors” the model to today’s yield curve  
> while the diffusion term ($\sigma dW_t$) generates future randomness.

---

### 13.3 OIS vs Term Rates (Quick Clarification)

Even though OIS is based on overnight rates:

- OIS swaps provide **term structure** via traded fixed rates.  
- Bootstrapping uses these swap prices to infer forward OIS discounting curves.

Thus, OIS curve is fully suitable for forward rate computation.

---

## 14. Volatility Smile (High-Level)

In simple Black models, volatility is constant.  
In real markets, implied volatility varies with:

- strike  
- maturity  

Plotting implied vol vs. strike yields a **smile/skew**.

### 14.1 Smile in Interest Rate Markets

Swaption markets provide a full volatility surface:

- Tenor × Expiry  
- At-the-money, ITM/OTM skews  

Models must fit this surface as best as possible.

#### Approaches:

- Parametric models (SABR)  
- Multi-factor Gaussian models  
- Adjusted short-rate models (local vol / displaced diffusions)  

Smile matters because:

- It encodes market perception of tail risk.  
- It affects pricing of swaptions, callable products, CMS, and XVA exposure.

---

## 15. Summary

Key intuitions:

- Brownian increments scale as $\sqrt{dt}$; randomness increases as $\sqrt{T}$.  
- “Normal/lognormal” refers to the distribution of the *model variable*, not $dW_t$.  
- Daily calibration aligns the model to today’s yield curve.  
- Short-rate models (Vasicek, HW1F/HW2F, CIR) give affine term structures.  
- HJM provides a general no-arbitrage framework; LMM is its tradable, discrete version.  
- Multi-curve is mandatory post-2008 (OIS discounting vs tenor forwarding).  
- Smile/surface is the “fingerprint” of market option prices; models must map to it.

